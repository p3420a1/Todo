import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import Home from '../screens/home/index'
import AddTodo from '../screens/AddTodo/index'
import EditTodo from '../screens/EditTodo/index'

const MainStack = createStackNavigator();

function Navigation() { 
    return(
    <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name = "Todo" component = {Home}/>
            <MainStack.Screen name = "AddTodo" component = {AddTodo}/>
            <MainStack.Screen name = "EditTodo" component = {EditTodo}/>
        </MainStack.Navigator>
    </NavigationContainer>
    )}

export default Navigation;