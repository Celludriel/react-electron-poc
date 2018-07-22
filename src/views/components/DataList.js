import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem} from 'material-ui/List';

export default class DataList extends Component {
    render() {
        return (
            <List>
                {
                    this.props.data.map(function(d, idx) {
                        return (<ListItem key={idx} primaryText={d.Name} />)
                    })
                }
            </List>
        );
    }
}

DataList.propTypes = {
  data: PropTypes.array
};
