import React from 'react';
import { View, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign'
import { createTodoActionCreator } from '../../redux/store';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function AddTodo(props){
    const [value, onChangeText] = useState('')
    const dispatch = useDispatch();

    const addTodoItem = value => {
        if(!value.length) return
        dispatch(createTodoActionCreator({desc: value}))
        props.navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    placeholder="Add a task to do"
                    value = {value}
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress = {() => addTodoItem(value)}
                >
                    <Icons name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        marginTop: 30,
        marginBottom: 20,
    },
    text: {
        color: '#101010',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        height: 50,
        width: '70%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        paddingLeft: 10,
        fontSize: 17,
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#222',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        padding: 10,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})