import {Component} from 'react';

class Hello extends Component {
    static defaultProps = {
        name: 'Unknown'
    };

    render() {
        const {color, name, isSpecial} = this.props;
        return (
            <div style={{color}}>
                { isSpecial && <b>*</b> }
                Hello World! {name}
            </div>
        );
    }
}

// Hello.defaultProps = {
//     name: 'Unknown'
// }

export default Hello;