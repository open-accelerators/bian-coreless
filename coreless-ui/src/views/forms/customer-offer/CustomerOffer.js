import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormCheck,
  CRow,
} from '@coreui/react'

export default class CustomerOffer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customerFirstName: '',
    }
  }
  handleInputChanged(event) {
    this.setState({
      customerFirstName: event.target.value,
    })
  }
  handleButtonClicked() {
    window.location.href =
      'https://youtube.com/results?search_query=' + this.state.customerFirstName
  }

  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <CCardHeader>
            <strong>New Customer Offer</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerFirstName">First Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="CustomerFirstName"
                  placeholder="John"
                  value={this.state.customerFirstName}
                  onChange={this.handleInputChanged.bind(this)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerEmail">Email address</CFormLabel>
                <CFormInput type="email" id="CustomerEmail" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerLastName">Last Name</CFormLabel>
                <CFormInput type="text" id="CustomerLastName" placeholder="Doe" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerAddress">Address</CFormLabel>

                <CFormInput type="text" id="CustomerAddress" placeholder="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerIncome">Income</CFormLabel>
                <CFormInput type="text" id="CustomerIncome" placeholder="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerRequestedServices">
                  <strong>Requested Services</strong>
                </CFormLabel>
                <CFormCheck id="CustomerIncome" label="Credit Card" />
                <CFormCheck id="CustomerIncome" label="Loan" />
                <CFormCheck id="CustomerIncome" label="New Account" />
              </div>
            </CForm>
          </CCardBody>
          <CButton type="submit" className="mb-3" onClick={this.handleButtonClicked.bind(this)}>
            Validate
          </CButton>
        </CCol>
      </CRow>
    )
  }
}
