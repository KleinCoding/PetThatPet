
## ### Universal - 
##           CatPaw at top of screen
    enter: power-on, persist: beat
###### Landing
##           Logo
    enter: float-btt-in, exit: power-off
##           Cards
    enter: spring-ttb-in, exit: power-off
###### Profile
##           Logo
     enter: float-btt-in, exit: power-off
##           Cards
    enter: spring-ttb-in, exit: power-off



## Universal - 
##       CatPaw at top of screen
        power-on, beat
<div
        id="iconHolder"
        className="landingIconHolder"
        class="ld ld-power-on paused">
</div>
<div 
      id= "iconWiggle"
        className="iconWiggle"
        class="ld ld-beat paused"
        style={{
          width: `50vw`,
          animationPlayState: `${iconPlayState}`,
          animationDuration: `2.5s`
        }}>
</div>

## Profile
##      Logo
     enter: float-btt-in, exit: power-off
<h1
        id= "logoEnter"
        className="welcomeLogoHolders"
        class="ld ld-float-btt-in paused"
        style={{
          animationPlayState: `${profilePlayState.logo}`,
          animationDuration: `2s`
        }}>
</h1>><div 
        id ="logoExit"
        className ="welcomeLogoExit"
        class="ld ld-power-off paused" 
        style={{
          animationPlayState: `${profilePlayState.exit}`,
          animationDuration: `2s`
        }}></div

##      Cards
    enter: spring-ttb-in, exit: slide-rtl-out, 
<div 
          id= "cardEnter"
          className= "welcomeCardEnter"
          class="ld ld-spring-ttb-in paused"
          style={{
            animationPlayState: `${profilePlayState.card}`,
            animationDuration: `3s`
          }}>
<div
            id= "cardExit"
            className="welcomeCardExit"
            class="ld ld-power-off paused"
            style={{
              animationPlayState: `${profilePlayState.exit}`,
              animationDuration: `2s`
            }}></div></div>

## Landing
##      Logo
    enter: float-btt-in, exit: power-off

<div 
            id= "logoEnter"
            className="landingLogoEnter"
            class="ld ld-float-btt-in paused"
            style={{
             animationPlayState: `${landingPlayState.logo}`,
             animationDuration: `2s`
            }}>
<h1
            id= "logoExit"
            className ="landingLogoExit"
            class="ld ld-power-off paused" 
            style={{
              animationPlayState: `${landingPlayState.exit}`,
              animationDuration: `2s`
            }}></h1></div>

##      Cards

    enter: spring-ttb-in, exit: slide-rtl-out

<div 
              id= "cardEnter"
              className= "landingCardEnter"
              class="ld ld-spring-ttb-in paused"
              style={{
                animationPlayState: `${landingPlayState.card}`,
                animationDuration: `3s`
              }}>
              <div
                id="cardExit"
                className="landingCardExit"
                class="ld ld-slide-rtl-out paused"
                style={{
                  animationPlayState: `${landingPlayState.exit}`,
                  animationDuration: `2s`
                }}>