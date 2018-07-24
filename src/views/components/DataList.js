import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem} from 'material-ui/List';

export default class DataList extends Component {
    render() {
        return (
            Object.keys(this.props.data).length === 0 && this.props.data.constructor === Object ? "" :
            <List>
                {
                    Object.values(this.props.data).map(function(d, idx) {
                        return (<ListItem key={idx} primaryText={d.name} />)
                    })
                }
            </List>
        );
    }
}

DataList.propTypes = {
  data: PropTypes.object
};
