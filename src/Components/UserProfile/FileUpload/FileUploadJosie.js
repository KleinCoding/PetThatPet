import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'



class FileUploadJosie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedUrl: this.props.profileImgUrl        
        
        }
    }



    fileOnChange = e => {
        const files = e.target.files
        const file = files[0]
        if(file == null) {
            alert('Error selecting file!')
        } else {
            axios.get(`/api/media/sign-s3?fileName=${file.name}&file-type=${file.type}`)
                .then(resSigned => {
                    console.log(file)
                    axios.put(resSigned.data.signedRequest, file, {
                        headers: {
                            'Content-Type': file.type
                            // 'Content-Length': file.size
                        }
                    })
                        .then(resUpload => {
                            this.setState({
                                uploadedUrl: resSigned.data.url
                            })
                            console.log(resSigned); 
                            console.log(resSigned.data.url)
                        })
                        .catch(err => {
                            console.log('Error uploading file:', err)
                        })
                })
                .catch(err => {
                    console.log('Error prepping file upload:', err)
                })
        }
    }


    submit = () => {
        const settings = {
            profileImgUrl: this.state.uploadedUrl,  
        }
        console.log(settings)
    }

    render() {

        return (
            <div className='edit-settings'>
                <div className='edit-settings-name-image'>
                    <label htmlFor='image_upload'>Upload a new Profile Image</label>
                    <input type='file' onChange={this.fileOnChange} accept='image/*' name='image_upload' id='image_upload' />
                    <input type='hidden' value={this.state.uploadedUrl} />
                </div>
                
                    <button onClick={this.submit} >Save Changes</button>
                </div>
            
        )
    }
}

const mapStateToProps = reduxState => {
  return {
    currentUser_id: reduxState.authReducer.currentUser_id
  }
}

export default connect(mapStateToProps )(FileUploadJosie);