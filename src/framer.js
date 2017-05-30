/**
 * Created by David Maser on 30/05/2017.
 */

const jsonSrc = './data/framer.json';
const Framer = {
  intervals:[],
  animateNode:'div',
  run(data){
    const frames = data['frames'];
    let f;
    for(f in frames){
      this.intervals.push(frames[f].keys);
    }
  },
  animate(){
    let i = 0;
    let frameLoop = this.intervals.length-1;
    let processIntervals = () => {
      let framePosition = this.intervals[i];
      let frameOffset = parseInt(Object.keys(framePosition));
      let frameParams = {};
      //console.log(i,framePosition,frameOffset);
      $.each(framePosition[frameOffset],function(a,b){
        frameParams[a] = b;
      });
      let styleObj = JSON.stringify(frameParams).replace(/"/g,'').replace(/,/g,';').replace(/{/g,'').replace(/}/g,'')
      console.log(i,JSON.stringify(frameParams).replace(/"/g,'').replace(/,/g,';').replace(/{/g,'').replace(/}/g,''));
      $(this.animateNode).attr('style',styleObj,function(){});
      $(this.animateNode).animate({
        opacity:'1'
      },frameOffset,function(){
        i++;
        i <= frameLoop ? processIntervals() : null;
      });
    };
    processIntervals();
  },
  exit(){
    this.remove();
  },
  fail(silent){
    silent === true ? this.exit() : this.getSrc();
  },
  getSrc(){
    $.ajax({
      url:jsonSrc,
      success:(data)=>{
        $.when(this.run(data)).then(this.animate());
      },
      error:()=>{
        this.fail(true)
      }
    })
  }
};
$(function(){
Framer.getSrc();
});