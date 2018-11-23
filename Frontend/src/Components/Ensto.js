import React ,{Component} from 'react';
import axios from 'axios';
class Ensto extends Component {

    constructor(props){
        super(props) ;
        this.state = {
           data :[]

        }
    }



    componentDidMount =()=> {
        this.getdata() ;

    }
        getdata(){
    return axios.get('http://localhost:8000/ensto', {
     
    })
      .then(response => {
        //console.log(response)
        const res = response
        this.setState({
          data: res.data

        })
        console.log(this.state.data)
      })
      .catch(() => alert("Something went wrong !!Check Backend console !!"))


  };

    render (){
        return(
            <div></div>
        )
    }





}

export default Ensto ;
