import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState} from 'react';
import { Alert, Button, StyleSheet, Text, View, Share} from 'react-native';

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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: quote.toString(),
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
};

  const [textSize, setTextSize] = useState(10)

  return (
    <View style={styles.container}>
      <Slider
        style={{width: "100%"}}
        minimumValue={10}
        maximumValue={30}
        onValueChange={value => setTextSize(value)}
      />
      <Text style = {[styles.quote,{fontSize:textSize}]}>{quote}</Text>
      <Button title='Get Quote' onPress={generateQuote} />
      <Button title = "Share" onPress={handleShare}/>
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
    marginVertical:"5%",
  }
});
