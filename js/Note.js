var Note = React.createClass({
    
    getInitialState : function(){
        return {editing:false};
    },
    
    randomBetween : function(min,max){
      return (min+Math.ceil(Math.random()*max));  
    },
    
    componentWillMount: function(){
      this.style={
          right:this.randomBetween(0,window.innerWidth-230)+'px',
          top:this.randomBetween(0,window.innerHeight-200)+'px',
          transform:'rotate('+this.randomBetween(-20,30)+'deg)'          
         }  
    },
    
    edit:function(){
        this.setState({editing:true});
    },
    save : function(){
      this.props.onChange(this.refs.newText.value,this.props.index);        
      this.setState({editing:false});  
    },
    remove:function(){
        this.props.onRemove(this.props.index);
    },
    
    renderDisplay : function(){
        return (  <div className="note" style={this.style}>
                     <p>{this.props.children}</p> 
                   <span className="actionButtons">
                     <button onClick={this.edit} className="btn btn-xs btn-primary glyphicon   
                            glyphicon-pencil"></button>
                     <button onClick={this.remove} className="btn btn-xs btn-danger remove-button  
                            glyphicon glyphicon-trash"></button>
                   </span>
                 </div>
              );
    },
    renderForm : function(){
        return (
                <div className="note" style={this.style}>
                   <textarea ref="newText" className="form-control" 
                       defaultValue={this.props.children}> 
                   </textarea>
                   <button onClick={this.save} className="btn btn-sm btn-success glyphicon 
                       glyphicon-floppy-disk"/>
                </div>
               );
        
    },
    
    render:function(){
       //return this.renderForm();
       // return this.renderDisplay();
        if(this.state.editing){ return this.renderForm();}
        else{return this.renderDisplay();}
    }   
    
});

var Board=React.createClass({
    
    getInitialState :function(){
       return {        
           notes:[]
       }; 
    },
    
    nextId:function(){
       this.uniqueId=this.uniqueId || 0;
        return this.uniqueId++;
},
    add : function(text){
      console.log("Add called with :"+text);    
      var arr=this.state.notes;        
      arr.push({
          id:this.nextId(),note:text
      }
      );
      console.log("After add push");    
      this.setState({notes:arr});    
    },
    
    update : function(newText,i){
        var arr=this.state.notes;
        arr[i].note=newText;
        this.setState({notes:arr});
    },
    
    remove : function(i){
        var arr=this.state.notes;
        arr.splice(i,1);
        this.setState({notes:arr});
    },
    
    eachNote : function(note,i){
        return (
                <Note key={note.id} index={i} onChange={this.update}  onRemove={this.remove}>
                 {note.note}
                </Note>          
               );
    },
    
    propTypes : {
          count : function(props,propName)  {
              if(typeof(props[propName]) !== "number"){
                  return new Error("Count must be a number");
              }
              if(props[propName] > 50){
                  return new Error("Can only create upto 50 notes");
              }
          }    
    },
    
       render: function(){
           return (
                      <div>
                       {this.state.notes.map(this.eachNote)}
                       <button className="btn btn-sm glyphicon glyphicon-plus"
                               onClick={this.add.bind(null,"New Note")}/>
                     </div>
                  );
       }
});

ReactDOM.render(<Board count={10} />,document.getElementById('react-container'));