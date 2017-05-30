/**
 * Created by David Maser on 30/05/2017.
 */
const jsonSrc = `./data/framer.json`;
const Framer = {
  intervals:[],
  animateNode:'div',
  transitionDelay: 0.5,
  animationLoop:false,
  append:{
    head:{
      style : () => {
        const style = `<style type="text/css">div{transition:all ${this.transitionDelay}s}</style>`;
        $('head').append(style);
      }
    }
  },
  run(data){
    const frames = data['frames'];
    frames.map((obj) => {
      this.intervals.push(obj.key);
      }
    );
  },
  animate(){
    let i = 0;
    let frameLoop = this.intervals.length-1;
    let processIntervals = (reset) => {
      if (reset === true) {
        i = 0;
        $(this.animateNode).attr('style', '');
        this.exit();
      } else {
        let framePosition = this.intervals[i];
        let frameOffset = parseInt(Object.keys(framePosition));
        let frameParams = {};
        $.each(framePosition[frameOffset], (a, b) => {
          frameParams[a] = b;
        });
        let styleObj = JSON.stringify(frameParams).replace(/"/g, '').replace(/,/g, ';').replace(/{/g, '').replace(/}/g, '');
        console.log(i, frameParams);
        $(this.animateNode).attr('style', styleObj);
        $(this.animateNode).animate({
          opacity: '1'
        }, frameOffset, function () {
          i <= frameLoop ? processIntervals() : null;
          i++;
        });
      }
    };
    processIntervals();
  },
  exit(){
    return;
  },
  fail(silent){
    silent === true ? this.getSrc() : this.exit();
  },
  getSrc(){
    $.ajax({
      url:jsonSrc,
      success:(data)=>{
        $.when(this.run(data)).then(this.append.head.style()).then(this.animate());
      },
      error:()=>{
        this.fail(true)
      }
    })
  }
};
export default class FrameHandler{
  constructor(){
    Framer.getSrc();
  }
}
$(()=>{
new FrameHandler();
});