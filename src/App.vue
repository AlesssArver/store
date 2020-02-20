<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
@mixin google-font($family)
  @import url("https://fonts.googleapis.com/css?family=#{$family}")


@include google-font("Comfortaa:500,700&display=swap")  
@include google-font("Squada+One&display=swap")


*
  margin: 0
  padding: 0

body 
  color: #0f0f0f
  font-family: 'Comfortaa', cursive
  font-size: 18px
  letter-spacing: 1px

  &::-webkit-scrollbar 
    width: 1em

  &::-webkit-scrollbar-track 
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)

  &::-webkit-scrollbar-thumb 
    background-color: darkgrey
    outline: 1px solid slategrey
    border-radius: 20px

#app 
  text-align: center
  color: #2c3e50

a 
    text-decoration: none  
    color: #0f0f0f

li 
  list-style: none

.field
    margin-bottom: 20px

.input,
.select
    padding: 5px
    // width: 300px
    height: 45px
    border: none
    border: 1px solid lightgray
    border-radius: 20px
    // border-bottom: 2px solid
    font-size: 18px

.input:focus,
.select:focus,
.select_multiple:focus 
  outline: none
  border: 2px solid red


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none

input[type=number]
  -moz-appearance:textfield

.select_multiple
  padding: 5px
  width: 100px
  border: none
  border: 1px solid lightgray
  border-radius: 15px
  // border-bottom: 2px solid
  font-size: 18px

  &::-webkit-scrollbar 
    width: 10px

  &::-webkit-scrollbar-track 
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3)
    border-radius: 0 20px 20px 0

  &::-webkit-scrollbar-thumb 
    background-color: darkgrey
    outline: 1px solid slategrey
    border-radius: 0 20px 20px 0

.btn
    // width: 120px
    // height: 40px
    // border-radius: 25px
    // border: none
    // cursor: pointer
    // font-size: 18px  
    padding: 13px 30px
    background: none
    border: 1px solid
    border-radius: 10px
    font-size: 18px
    letter-spacing: 1px
    text-transform: uppercase
    cursor: pointer
    transition: all 0.3s ease

    &:hover
        background: #000
        color: #fff

.checkbox 
  -webkit-appearance: none
  margin-right: 10px
  padding: 10px
  border: 2px solid #000
  // background: #000
  border-radius: 5px
            
  &:checked 
    padding: 10px
    border: 2px solid #000
    background: #fff
    position: relative

    &::after
      content: ''
      padding: 6px
      background: #000
      border-radius: 2px
      display: block
      position: absolute
      top: 20%
      right: 20%
      

.openDropdown 
  cursor: pointer
// .dropdown
//   position: relative
//   display: inline-block

//   &:hover

//     .dropdown_list
//       display: block

//   .openDropdown

//   .dropdown_list
//     display: none
//     list-style: none

//     .dropdown_item

//       a
</style>
