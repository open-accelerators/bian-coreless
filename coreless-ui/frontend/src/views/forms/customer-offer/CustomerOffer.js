import React from 'react'
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CRow,
} from '@coreui/react'

export default class CustomerOffer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customerFirstName: '',
      customerLastName: '',
      customerEmail: '',
      customerAddress: '',
      customerIncome: '',
      customerRequestedServicesCC: false,
      customerRequestedServicesLoan: false,
      customerRequestedServicesNA: false,
      response: '',
    }
  }
  clearState() {
    this.setState({
      customerFirstName: '',
      customerLastName: '',
      customerEmail: '',
      customerAddress: '',
      customerIncome: '',
      customerRequestedServicesCC: false,
      customerRequestedServicesLoan: false,
      customerRequestedServicesNA: false,
    })
  }
  handleInputChanged(event) {
    switch (event.target.id) {
      case 'CustomerFirstName':
        this.setState({
          customerFirstName: event.target.value,
        })
        break
      case 'CustomerLastName':
        this.setState({
          customerLastName: event.target.value,
        })
        break
      case 'CustomerEmail':
        this.setState({
          customerEmail: event.target.value,
        })
        break
      case 'CustomerAddress':
        this.setState({
          customerAddress: event.target.value,
        })
        break
      case 'CustomerIncome':
        const income = event.target.value
        if (income === '' || /^[0-9\b]+$/.test(income)) {
          this.setState({
            customerIncome: income,
          })
        }
        break
      case 'CustomerRequestedServicesCC':
        this.setState({
          customerRequestedServicesCC: !this.state.customerRequestedServicesCC,
        })
        break
      case 'CustomerRequestedServicesLoan':
        this.setState({
          customerRequestedServicesLoan: !this.state.customerRequestedServicesLoan,
        })
        break
      case 'CustomerRequestedServicesNA':
        this.setState({
          customerRequestedServicesNA: !this.state.customerRequestedServicesNA,
        })
        break
    }
  }
  handleButtonClicked() {
    this.setState({ response: 'Loading...' })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ procedure: { customerReference: this.state.customerFirstName } }),
    }
    fetch('/customerOffer', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ response: data.message })
      })

    this.clearState()
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
                <CFormLabel htmlFor="CustomerLastName">Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="CustomerLastName"
                  placeholder="Doe"
                  value={this.state.customerLastName}
                  onChange={this.handleInputChanged.bind(this)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerEmail">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="CustomerEmail"
                  placeholder="name@example.com"
                  value={this.state.customerEmail}
                  onChange={this.handleInputChanged.bind(this)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerAddress">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="CustomerAddress"
                  placeholder=""
                  value={this.state.customerAddress}
                  onChange={this.handleInputChanged.bind(this)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerIncome">Income</CFormLabel>
                <CFormInput
                  type="text"
                  id="CustomerIncome"
                  placeholder=""
                  value={this.state.customerIncome}
                  onChange={this.handleInputChanged.bind(this)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="CustomerRequestedServices">
                  <strong>Requested Services</strong>
                </CFormLabel>
                <CFormCheck
                  id="CustomerRequestedServicesCC"
                  label="Credit Card"
                  checked={this.state.customerRequestedServicesCC}
                  onClick={this.handleInputChanged.bind(this)}
                />
                <CFormCheck
                  id="CustomerRequestedServicesLoan"
                  label="Loan"
                  checked={this.state.customerRequestedServicesLoan}
                  onClick={this.handleInputChanged.bind(this)}
                />
                <CFormCheck
                  id="CustomerRequestedServicesNA"
                  label="New Account"
                  checked={this.state.customerRequestedServicesNA}
                  onClick={this.handleInputChanged.bind(this)}
                />
              </div>
            </CForm>
          </CCardBody>
          <CButton type="submit" className="mb-3" onClick={this.handleButtonClicked.bind(this)}>
            Validate
          </CButton>
          <div>
            <strong style={{ color: 'blue' }}>{this.state.response}</strong>
          </div>
        </CCol>
      </CRow>
    )
  }
}
