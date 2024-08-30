import React, { useEffect, useState } from 'react';
import Groq from "groq-sdk";
const groq = new Groq({ dangerouslyAllowBrowser: true, apiKey: "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"});

const Descript = (props) => {
  const [response, setResponse] = useState("");
  let prompt = props.data + "---- Take this weather data and describe the weather of the beach and how safe and comfortable it is to visit the beach (i.e. tourism suitability) Give only description interpreted from the data, no ratings. - LIMIT RESPONSE TO 50 WORDS";
  useEffect(()=>{  
    let airesponse = "";
    async function askgroq(prompt) {
        const chatCompletion = await groq.chat.completions.create({
          "messages": [
            {
              "role": "user",
              "content": prompt,
            }
          ],
          "model": "llama3-70b-8192",
          "temperature": 1,
          "max_tokens": 1024,
          "top_p": 1,
          "stream": true,
          "stop": null
        });
        for await (const chunk of chatCompletion) {
          airesponse+=(chunk.choices[0]?.delta?.content || '');
        }
        setResponse(airesponse);
      }
    askgroq(prompt);
  }, [prompt]);

  return (
    <>
      <h1 className='py-4 px-2'>{response}</h1>
    </>
  )
}

export default Descript