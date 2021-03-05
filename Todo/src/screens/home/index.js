import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Dimensions
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import AIcons from 'react-native-vector-icons/AntDesign'
import { deleteTodoActionCreator, toggleTodoActionCreator } from '../../redux/store';

const { width } = Dimensions.get('window');

export default function Home(props) {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const editedCount = useSelector(state => state.counter);

    const toggleTaskStatus = item => {
        if(!item.id || !item) return;
        dispatch(toggleTodoActionCreator({id : item.id, isComplete : !item.isComplete}))
    }

    const deleteTask = item => {
        if(!item.id || !item) return;
        dispatch(deleteTodoActionCreator( {id : item.id} ))
    }

    const editTask = item => {
        props.navigation.navigate('EditTodo', {item: item})
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>React Native Todo App</Text>
            <Text style={styles.text}>Edited Count: {editedCount}</Text>
            <FlatList
                data={todos}
                keyExtractor={(_, id) => id.toString()}
                renderItem={({ item }) =>
                    <View style={styles.todoItem}>
                        <View style={styles.todoItemRow1}>
                        <TouchableOpacity
                            onPress={() => toggleTaskStatus(item)}
                        >
                            <MIcons
                                name={item.isComplete ? 'check-circle' : 'radio-button-unchecked'}
                                size={24}
                                color={item.isComplete ? '#28a745' : '#dc3545'}
                            />
                        </TouchableOpacity>
                        <Text style={item.isComplete ? styles.strikeItemText : styles.todoItemText}>
                            {item.desc}
                        </Text>
                        </View>
                        <View style={styles.todoItemRow2}> 
                        <TouchableOpacity
                            onPress={() => editTask(item)}
                        >
                            <AIcons name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => deleteTask(item)}
                        >
                            <AIcons name="delete" size={20} color="red" style = {{marginLeft: 10}}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                }
            />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => props.navigation.navigate('AddTodo')}
            >
                <Text style={styles.buttonText}>Add New</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    todoItem: {
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        width: width - 20,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 10
    },
    todoItemRow1: {
        alignContent: 'center',
        flexDirection: 'row',
    },
    todoItemRow2: {
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    text: {
        color: '#101010',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    todoItemText: {
        lineHeight: 22,
        fontSize: 17,
        textAlign: 'left',
        paddingLeft: 10
    },
    strikeItemText: {
        lineHeight: 22,
        fontSize: 17,
        textAlign: 'left',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        paddingLeft: 10
    },
    buttonContainer: {
        width: width - 20,
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    }
})
