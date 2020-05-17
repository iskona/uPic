import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import API from '../utils/API';

class UploadImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			selectedFiles: null,
			uploaded : false
		}
	}

	singleFileChangedHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = (event) => {
		const data = new FormData();
		console.log("--- contest id ---"+this.props.contestid);
		// If file selected
		if (this.state.selectedFile) {
			data.append('contestImage', this.state.selectedFile, this.state.selectedFile.name);

			console.log("data being sent "+data);
			axios.post('/api/images/img-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then((response) => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								this.ocShowAlert('Max size: 2MB', 'red');
							} else {
								console.log(response.data);// If not the given file type
								this.ocShowAlert(response.data.error, 'red');
							}
						} else {
							// Success
							this.setState({uploaded : true})
							this.ocShowAlert('File Uploaded', '#008000');
							const imageDetails = {
								owner:localStorage.getItem("email"), //who uploaded the picture
								contestId:this.props.contestid,//In which contest
								location:response.data.location,//amazon s3 location
							}
							console.log(imageDetails)
							API.saveImageDetails(imageDetails)
							.then(res => {
								console.log(res);
							})
							.catch(err => console.log(err))
						}
					}
				}).catch((error) => {
					// If another error
					this.ocShowAlert(error, 'red');
				});
		} else {
			// if file not selected throw error
			this.ocShowAlert('Please upload file', 'red');
		}
	};

	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
		 alertEl = document.createElement( 'div' ),
		 textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
		 $( alertEl ).fadeOut( 'slow' );
		 $( alertEl ).remove();
		}, 3000 );
	   };

	render() {
		return (
			<div className="container w-50">
				  {/* For Alert box*/}
				  <div id="oc-alert-container" className="p-2"></div>
				{/* Single File Upload*/}
				{!this.state.uploaded && <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
					<div className="card-header">
						<h4 style={{ color: '#555', marginLeft: '12px' }}>Upload a Wonderful Pic !!</h4>
						<p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
					</div>
					<div className="card-body">
                        <input
                            type="file" 
                            onChange={this.singleFileChangedHandler} 
                            className="text-center"
                            />
						<div className="mt-5">
							<button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
						</div>
					</div>
				</div>}
				{this.state.uploaded && <h4>Thanks for the participation!!</h4>}
			</div>
		);
	}
}

export default UploadImage;