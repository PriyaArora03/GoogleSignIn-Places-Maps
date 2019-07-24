import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default Loader = (props) => {

    return (

        <ActivityIndicator animating={props.animating}
            style={styles.activityIndicator}
            size="large"
            color="black"
        />
    );

}
const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

