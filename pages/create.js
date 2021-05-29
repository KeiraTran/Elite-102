//import React, { useState } from 'react';
import React from "react";
import BlogId from "./api/blog/[blogId]";
export default function CreateNewPost(props) {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
//set current value of input field equal to state
    function setInput(event) {
        event.preventDefault()
        setTitle (event.target.value)
    }

    function handleOnContentChange(event) {
        event.preventDefault()
        setContent (event.target.value)
    }

    async function handleSubmit(event) {
        console.log("hello world")
        event.preventDefault()
        const jsonBody = {title:title, content:content}
        console.log(jsonBody)

        const res = await fetch("http://localhost:3000/api/blog", {
            body: JSON.stringify(jsonBody), 
            method: "POST"
        })
        const result = await res.json()
        console.log(result)
      
    }
      return (
        <>
          <form onSubmit={handleSubmit}>
            <h1>Create New Post</h1>
            <input
              type="text"
              onChange={setInput}
              placeholder="title"
              value = {title}
              size="39"
              required
              />
            <br />
            <br />
            <textarea
              onChange={handleOnContentChange}
              placeholder="contents"
              value = {content}
              rows="8"
              cols="41"
             required
            />
            <br />
            <br />
            <button 
              type = "submit">
                Save Post
                </button>
          </form>
          {title}
          {content}
        </>
      );
    };

