import React, { Component, MouseEvent, ReactElement } from 'react';
import { getAllCity, CityRootObject, NewCity } from './Service'
import './App.css';

/**
 *  上海 011 
 *  青浦 012 parencode 011
 */
interface APPState {
  show: boolean,
  citys?: NewCity[],
  provinceCode: string,
  cityCode: string,
  countyCode: string,
  currentCode: string
}
const nationCode = "100000"
class App extends Component<{}, APPState> {

  constructor(prop: {}) {
    super(prop)
    this.state = {
      show: false,
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      currentCode: nationCode
    }
  }


  componentDidMount() {
    getAllCity().then(citys => {
      console.log(citys)
      this.setState({
        citys
      })
    })
  }

  handleClick = () => {
    const { show,provinceCode,cityCode,countyCode } = this.state

    this.setState({
      show: !show,
      provinceCode : provinceCode,
      cityCode : cityCode,
      countyCode : countyCode,
      // currentCode: provinceCode ? provinceCode :nationCode
      currentCode: nationCode
    })
  }

  handleLiClick = (code: string, lv: number) => {
    this.setState({
      currentCode: code
    })

    if (lv === 1) {
      this.setState({
        provinceCode: code
      })
    } else if (lv === 2) {
      this.setState({
        cityCode: code
      })
    } else if(lv === 3){
      this.setState({
        countyCode: code,
        show:false
      })
    }
  }

  // findNameByCode = () => {
  //   const { currentCode, citys } = this.state
  //   const jsxEles: JSX.Element[] = [];

  //   this.findName(currentCode, jsxEles)
  //   return jsxEles
  // }

  // selectCity = (code:string,lv:number) => {
  //   console.log(code,lv,'????')
  //   if(lv === 3) {
  //     return
  //   }
  //   this.setState({
  //     currentCode: code
  //   })

  //   if (lv === 1) {
  //     this.setState({
  //       provinceCode: code
  //     })
  //   } else if (lv === 2) {
  //     this.setState({
  //       cityCode: code
  //     })
  //   } else if(lv === 3){
  //     this.setState({
  //       countyCode: code
  //     })
  //   }

  // }

  selectCity = (code:string,lv:number) => {
    console.log(code,lv,'????')
    const {provinceCode, cityCode } = this.state
    // if(lv === 3) {
    //   return
    // }
    this.setState({
      show :true
    })
    if (lv === 1) {
      this.setState({
        currentCode : nationCode
      })
    } else if (lv === 2) {
      this.setState({
        currentCode: provinceCode
      })
    } else if(lv === 3){
      this.setState({
        currentCode: cityCode
      })
    }

  }

  findName = (code: string,tip:string) => {
    const { citys } = this.state

    if (!citys) return

    const currentCity = citys.find(val => val.code === code)
    console.log(currentCity,'currentCity')

    if (!currentCity) return <span>请选择{tip}</span>

    return <span onClick={() => { this.selectCity(currentCity.code, currentCity.lv) }}>{currentCity.name}</span>
  }




  render() {
    const { show, cityCode, countyCode, provinceCode, currentCode } = this.state
    return (
      <div className="App">
        <button onClick={this.handleClick}>click</button>

        <span>{this.findName(provinceCode,'省')}</span>/<span>{this.findName(cityCode,'市')}</span>/<span>{this.findName(countyCode,'区')}</span>


        <Select citys={this.state.citys} code={currentCode} show={show} onClick= {this.handleLiClick}/>
        {/* <div className={`select-city ${show ? '' : 'hide'}`}>
          <ul>
            {this.state.citys && this.state.citys.filter(val => val.parentCode === currentCode).map(val => {
              return <li onClick={() => { this.handleLiClick(val.code, val.lv) }} key={val.code}>{val.name}</li>
            })}
          </ul>
        </div> */}
      </div>
    );
  }
}


interface SelectProp{
  citys?:NewCity[];
  show:boolean;
  code:string;
  onClick:(code:string,lv:number)=>void
}

export const Select:React.SFC<SelectProp> = ({citys,show,code,onClick})=>{
  
  return (
    <div className={`select-city ${show ? '' : 'hide'}`}>
    <ul>
      {citys && citys.filter(val => val.parentCode === code).map(val => {
        return <li onClick={() => { onClick(val.code, val.lv) }} key={val.code}>{val.name}</li>
      })}
    </ul>
  </div>
  )
}

export default App;
