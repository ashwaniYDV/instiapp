import React, { Component } from "react";
import { Select, Col,Typography } from "antd";
const { Option } = Select;
const {Title}  = Typography;

class MessMenu extends Component {
  state = {
    hostel: 1
  };

  handleChange = value => {
    this.setState({
      hostel: value
    });
  };

  render() {
    console.log(this.state.hostel);
    const hostel1 = [{
        "day": "Monday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Tuesday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Wednesday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Thursday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Friday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Saturday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },
    {
        "day": "Sunday",
        "Breakfast": ['Banana','Apple','Cucumber'],
        "Lunch":  ['Banana','Apple','Cucumber'],
        "Snacks":  ['Banana','Apple','Cucumber'],
        "Dinner":  ['Banana','Apple','Cucumber']
    },

]
const hostel2 = [{
    "day": "Monday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Tuesday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Wednesday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Thursday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Friday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Saturday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},
{
    "day": "Sunday",
    "Breakfast": ['z','x','y'],
    "Lunch":  ['z','x','y'],
    "Snacks":  ['z','x','y'],
    "Dinner":  ['z','x','y']
},

]
const hostel3 = [{
    "day": "Monday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Tuesday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Wednesday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Thursday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Friday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Saturday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},
{
    "day": "Sunday",
    "Breakfast": ['p','q','r'],
    "Lunch":  ['p','q','r'],
    "Snacks":  ['p','q','r'],
    "Dinner":  ['p','q','r']
},

]
    let data
    if(this.state.hostel == 1){
        data = hostel1.map(({day,Breakfast,Lunch,Snacks,Dinner})=> {
            return (
                <Col sm={24} lg={8} style={{padding:'20px',font:100}}>
                    <Title  style={{fontWeight:100}} level={1}>{day}</Title>
                    <Title  style={{fontWeight:100}} level={4}>Breakfast</Title>
                    {
                        Breakfast.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Lunch</Title>
                    {
                        Lunch.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Snacks</Title>
                    {
                        Snacks.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Dinner</Title>
                    {
                        Dinner.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                </Col>

            )
            
        })
    }
    else if(this.state.hostel == 2){
        data = hostel2.map(({day,Breakfast,Lunch,Snacks,Dinner})=> {
            return (
                <Col sm={24} lg={8} style={{padding:'20px',font:100}}>
                    <Title  style={{fontWeight:100}} level={1}>{day}</Title>
                    <Title  style={{fontWeight:100}} level={4}>Breakfast</Title>
                    {
                        Breakfast.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Lunch</Title>
                    {
                        Lunch.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Snacks</Title>
                    {
                        Snacks.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Dinner</Title>
                    {
                        Dinner.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                </Col>

            )
            
        })
    }
    else{
        data = hostel3.map(({day,Breakfast,Lunch,Snacks,Dinner})=> {
            return (
                <Col sm={24} lg={8} style={{padding:'20px',font:100}}>
                    <Title  style={{fontWeight:100}} level={1}>{day}</Title>
                    <Title  style={{fontWeight:100}} level={4}>Breakfast</Title>
                    {
                        Breakfast.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Lunch</Title>
                    {
                        Lunch.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Snacks</Title>
                    {
                        Snacks.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                    <Title  style={{fontWeight:100}} level={4}>Dinner</Title>
                    {
                        Dinner.map(el=>{
                            return (
                                <li style={{padding:10,fontSize:20}} type="none">{el}</li>
                            )
                        })
                    }
                </Col>

            )
            
        })
    }
    return (
      <div>
        <div id="mess">
          <Select
            defaultValue="1"
            style={{ width: 620, fontSize: 30, margin: 20 }}
            onChange={this.handleChange}
          >
            <Option value="1">hostel1</Option>
            <Option value="2">hostel2</Option>
            <Option value="3">hostel3</Option>
          </Select>
        </div>
        {   
            data ? data: "nothing"
        }
      </div>
    );
  }
}

export default MessMenu;
