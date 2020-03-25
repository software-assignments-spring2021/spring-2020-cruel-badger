import React from "react";
import './assets/css/about.css'
import Header from './header.js';




function About() {
	return (
		
<div className="App">
<Header/>
<div class="myContainer">
	<div class="innerBox">
		<img class="myImg" src={require("./assets/img/logo_draft_1.png")} alt="logo"/>
		<h2>ABOUT</h2>

		<div class="description_container_top">
			<h4>Broke Millennial is a web-based application that serves to alleviate the financial & 
          emotional stress that comes with being a hopeless, indecisive member of Generations Y & Z...Forget the self-help books! 
          This application goes beyond your basic personal budget-tracking & expenses management system; In fact, 'Broke Millennial' helps users make life's 
          BIG decisions by allowing them to plan out what their financial situation would look like in several potential scenarios.</h4>
		</div>

		<div class="description_container_mid">
			<h4>This project came to be as we, a group of seniors at NYU, began planning for our futures after graduation. 
          The real world comes with real responsibilities, and we wanted to come up with a a solution to ease that transition.
          For many young adults in between the ages of 20-30, the big question of "What's your next move?" often arises, especially for those who are facing major milestones such as college graduation. 
          The matter of fact is that it is difficult to accurately picture what your life would look like without first having some sort of foreshadowing of 'the health' of your bank account. </h4>
		</div>

		<div class="description_container_bottom">
			<h2>MEET THE TEAM</h2>
			<div class="row">

				<div class="column">
					<div class="card-about">
  						<img class="myImg" src={require("./assets/img/skye1.png")} alt="Avatar"/>
  						<div class="container-about">
    						<h4><b>Skye Daru</b></h4> 
    						<h4><i>Software Developer</i></h4> 
    						<h4>NYU CAS '20</h4>
  						</div>
					</div>
				</div>

				<div class="column">
					<div class="card-about">
  						<img class="myImg" src={require("./assets/img/allie.png")} alt="Avatar"/>
  						<div class="container-about">
    						<h4><b>Allie Goss</b></h4> 
    						<h4><i>Software Developer</i></h4>
    						<h4>NYU CAS '20</h4> 
  						</div>
					</div>
				</div>

				<div class="column">
					<div class="card-about">
  						<img class="myImg" src={require("./assets/img/daniel.png")} alt="Avatar"/>
  						<div class="container-about">
    						<h4><b>Daniel Suh</b></h4> 
    						<h4><i>Lead Developer</i></h4>
    						<h4>NYU CAS '20</h4> 
  						</div>
					</div>
				</div>

				<div class="column">
					<div class="card-about">
  						<img class="myImg" src={require("./assets/img/jahnavi.png")} alt="Avatar"/>
  						<div class="container-about">
    						<h4><b>Jahnavi Vyas</b></h4> 
    						<h4><i>Web Designer</i></h4>
    						<h4>NYU CAS '20</h4> 
  						</div>
					</div>
				</div>


				<div class="column">
					<div class="card-about">
  						<img class="myImg" src={require("./assets/img/gauresh.png")} alt="Avatar"/>
  						<div class="container-about">
    						<h4><b>Gauresh Walia</b></h4> 
    						<h4><i>Lead Designer</i></h4> 
    						<h4>NYU CAS '20</h4>
  						</div>
					</div>
				</div>

			</div>




		</div>



	</div>
</div>
      






</div>
	);
}


export default About;





