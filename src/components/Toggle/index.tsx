import React, {useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

import {
  MotiView, 
  useAnimationState,
  AnimatePresence // permite lidar com animações de componentes antes que seja desmontado
} from 'moti';

import { styles } from './styles';
import { theme } from '../../styles/theme';

// quando o usuário apertar e ficar segurando no toggle de ícone tag vai abrir umas 
//informações adicionais e muda o ícone para X para poder fechar (quando retirar o dedo)
export function Toggle() {
  const [toggleIsOpen, setToggleIsOpen] = useState(false);

  const toggleAnimationState = useAnimationState({
    closed:{
      height:70,
    },
    open:{
      height: 170,
    }
  });

  function handleOpenOrClosedToggle(state: 'open' | 'closed' ){
    toggleAnimationState.transitionTo(state);
    if(state === 'open'){
      setToggleIsOpen(true);
    }else{
      setToggleIsOpen(false)
    }
  }

   return (
    <MotiView 
      style={styles.container}
      state={toggleAnimationState}
    >
      <Pressable 
        onPressIn={()=>{handleOpenOrClosedToggle('open')}}
        onPressOut={()=>{handleOpenOrClosedToggle('closed')}}
      >
        {
          toggleIsOpen ?
          <AnimatePresence>
            <MotiView
              from={{
                rotate:'0deg',
                opacity: 0,
              }}
              animate={{
                rotate: '90deg',
                opacity: 1
              }}
              transition ={{
                type:'timing',
              }}
            >
              <Feather
                name="x"
                color={theme.colors.white}
                size={26}
              />
            </MotiView>
           </AnimatePresence>
          :
            <MotiView
              from={{
                scale:0,
                opacity:0,
              }}
              animate ={{
                scale:[
                  {value:0,type: 'timing'},
                  {value:1.1,type: 'spring'},
                  {value:1,type: 'timing'},
                ],
                opacity: 1,
              }}
              transition={{
                type:'timing', // pode ser também spring ou decay
                duration:1000
              }}
            >
              <Feather
                name="tag"
                color={theme.colors.white}
                size={26}
              />
            </MotiView>
        }
        
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.label}>
          Calories
        </Text>

        <Text style={styles.value}>
          150
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>
          Weight
        </Text>

        <Text style={styles.value}>
          190g
        </Text>
      </View>
    </MotiView >
  );
}