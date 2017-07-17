import React from 'react';

/*eslint-disable no-console*/
class LoadingDots extends React.Component{
    constructor(props){
        super(props);
        this.state={
            frame:1
        };
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({
                frame:this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount(){
        console.log('this.interval: ' + this.interval);
        clearInterval(this.interval);
    }

    render(){
        let dots = this.state.frame % ( this.props.dots + 1);
        let text = '';
        while (dots > 0) {
            text += '.';
            dots--;
        }
        return <span>{text}&nbsp;</span>;
    }

}

//defaultProps: see: https://facebook.github.io/react/docs/react-component.html#defaultprops
// LoadingDots.defaultProps = {
//     interval:300, dots:3
// };
//2017-06-28 remove defaultProps above to avoid "Unknown Prop Warning" in browser console
//https://facebook.github.io/react/warnings/unknown-prop.html


export default LoadingDots;
