import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [quotesArray, setQuotesArray] = useState([])
  const [quote, setQuote] = useState("")

  useEffect(() =>{
    async function fetchQuotes(){
      try{
        fetch("https://zenquotes.io/api/quotes/")
        .then(response => response.json())
        .then(data => setQuotesArray(data))
      } catch (error){
        console.log(error)
      }
    }
    fetchQuotes()
  },[])

  function generateQuote(){
    if (quotesArray.length > 0) {
      const random = Math.floor(Math.random() * quotesArray.length) 
      const selectedQuote = quotesArray[random];
      setQuote(`${selectedQuote.q} - ${selectedQuote.a}`); 
    }
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.quote}>{quote}</Text>
      <Button title='Get Quote' onPress={generateQuote} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:"5%"
  },
  quote:{
    textAlign:"center",
    marginVertical:"3%"
  }
});
