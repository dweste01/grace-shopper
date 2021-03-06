import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';


export default class SingleUser extends Component {


	constructor(props) {
		super(props);
		this.state = {
			editEmail: false,
			editAddress: false,
			email: this.props.user.email,
			address1: this.props.user.address1,
			address2: this.props.user.address2,
			city: this.props.user.city,
			state: this.props.user.state,
			zipcode: this.props.user.zipcode,
		}
		this.editEmailClick = this.editEmailClick.bind(this);
		this.submitEmailButton = this.submitEmailButton.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.editAddressClick = this.editAddressClick.bind(this);
		this.onChangeAddress1 = this.onChangeAddress1.bind(this);
		this.onChangeAddress2 = this.onChangeAddress2.bind(this);
		this.onChangeCity = this.onChangeCity.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.onChangeZipcode = this.onChangeZipcode.bind(this);
		this.submitAddressButton = this.submitAddressButton.bind(this);
	}


  calculateOrderTotal(order) {
		let total = 0;
		order.Products.map(product => {
			total += product.Product_order.price * product.Product_order.quantity
		})
		return total.toFixed(2);
	}

	editEmailClick() {this.setState({'editEmail': true});}

	editAddressClick() {this.setState({'editAddress': true})}

	submitEmailButton(evt) {
		evt.preventDefault();
		this.props.submitEmail(this.state.email, this.props.user.id);
		this.setState({'editEmail': false})
	}

	submitAddressButton(evt) {
		evt.preventDefault();
		const bodyObj = {
			address1: this.state.address1,
			address2: this.state.address2,
			city: this.state.city,
			state: this.state.state,
			zipcode: this.state.zipcode
		}
		this.props.submitAddress(bodyObj, this.props.user.id);
		this.setState({'editAddress': false})
	}

	onChangeEmail(evt) {this.setState({'email': evt.target.value})}

	onChangeAddress1(evt) {this.setState({'address1': evt.target.value})}

	onChangeAddress2(evt) {this.setState({'address2': evt.target.value})}

	onChangeCity(evt) {this.setState({'city': evt.target.value})}

	onChangeState(evt) {this.setState({'state': evt.target.value})}

	onChangeZipcode(evt) {this.setState({'zipcode': evt.target.value})}

	render() {

		const user = this.props.user;

		return(
		<div className="default-container">
		<div className="row">
		<div className="col-md-6">
			<h2 className="fancy-type"> Account Details</h2>
			<div className="panel panel-default account-details">
			  <div className="panel-body inner-panel">
			    <h4>Name: {user.firstName} {user.lastName}</h4>
			    {
			    	(!this.state.editEmail) ?
			    	<h4>Email: {user.email} <span onClick={this.editEmailClick} className="edit"> edit </span> </h4>
			    	:
			    	<div>
			    	<h4>Email: </h4>
			    	<span className="input-group">
			    		<form onSubmit={this.submitEmailButton} >
						  <input type="text" className="form-control" onChange={this.onChangeEmail} defaultValue={user.email} aria-describedby="basic-addon1" />
						  <span className="input-group-btn">
					        <button className="btn btn-default account-btns" type="submit">Change Email</button>
					      </span>
					      </form>
					</span>
					</div>
			    }
			    {
			    	(!this.state.editAddress) ?
			    	<div>
				    	<h4>Shipping Address:  <span onClick={this.editAddressClick} className="edit"> edit </span> </h4>
						    <h5> {user.address1} </h5>
						    {(user.address2) ? <h5> {user.address2} </h5> : null}
						    <h5> {user.city} {user.state} {user.zipcode} </h5>
				    </div>
						: <div>
					    	<h4>Shipping Address: </h4>
					    	<span className="input-group">
					    		<form onSubmit={this.submitAddressButton} >
									  <p>Address Line 1</p>
									  <input id="a1" type="text" className="form-control col-md-2" onChange={this.onChangeAddress1} defaultValue={user.address1} aria-describedby="basic-addon1" />
									  <p>Address Line 2</p>
									  <input id="a2" type="text" className="form-control col-md-2" onChange={this.onChangeAddress2} defaultValue={user.address2} aria-describedby="basic-addon1" />
									  <p>City</p>
									  <input id="city" type="text" className="form-control col-md-2" onChange={this.onChangeCity} defaultValue={user.city} aria-describedby="basic-addon1" />
									  <p>State</p>
									  <input id="state" type="text" className="form-control col-md-2" onChange={this.onChangeState} defaultValue={user.state} aria-describedby="basic-addon1" />
									  <p>Zipcode</p>
									  <input id="zip" type="text" className="form-control col-md-2" onChange={this.onChangeZipcode} defaultValue={user.zipcode} aria-describedby="basic-addon1" />
										  <span className="input-group-btn">
									        <button className="btn btn-default account-btns" type="submit">Change Address</button>
								      </span>
							    </form>
							</span>
					</div>
			    }
			  </div>
				</div>
			</div>


			<div className="col-md-6">
			<h2 className="fancy-type">Order History</h2>
				<div className="panel panel-default account-details">
				  <div className="panel-body inner-panel" >
					{
						(user.Orders !== undefined && user.Orders.length) ? user.Orders.map((order, idx1) => {
							return (
								<ul key={idx1} className="list-group inner-panel">
								<li className="list-group-item inner-panel"><h3>Order Placed On: {order.datePlaced.slice(0,10)} </h3></li>
								  {order.Products.map((product, idx) => {
											return (<li key={idx} className="list-group-item account-details"><p>
                      <Link to={`/products/${product.id}`}>
											<span className="col-md-4">
											{product.title}</span> </Link>
											<span className="col-md-4">Quantity: {product.Product_order.quantity}</span><span className="col-md-4">Price: {product.Product_order.price}</span></p></li>)
										})
									}
									<li className="list-group-item inner-panel"><p>Order Total: ${this.calculateOrderTotal(order)} </p></li>
								</ul>)
						})
						: <h4>No past orders!</h4>
					}
    		</div>
    	</div>
			</div>
			</div>
		</div>)
	}
}
