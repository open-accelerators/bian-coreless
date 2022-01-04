import React from 'react'
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
export default class PartyRoutingProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataArray: [],
      error: '',
    }
  }
  async componentDidMount() {
    await fetch('/partyRoutingProfile')
      .then((res) => res.json())
      .then((data) => this.setState({ dataArray: JSON.parse(data.prpData), error: data.error }))
  }
  refreshPage() {
    window.location.reload(false)
  }
  handleButtonClicked(item) {
    console.log('button was clicked ', item)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ procedure: { customerReference: item } }),
    }
    fetch('/UpdateCustomerOffer', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message)
      })

    this.refreshPage()
  }
  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <CCardHeader>
            <strong>Party Routing Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell width={550}>Request</CTableHeaderCell>
                  <CTableHeaderCell width={550}>Status</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Object.entries(this.state.dataArray).map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item[1].processId}</CTableDataCell>
                    <CTableDataCell>
                      {item[1].customerOfferStatus == '1' ? 'Complete' : 'Processing'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item[1].customerOfferStatus == '0' ? (
                        <CButton
                          color="dark"
                          variant="outline"
                          type="submit"
                          className="px-5 py-0"
                          onClick={this.handleButtonClicked.bind(this, item[1].processId)}
                        >
                          Update
                        </CButton>
                      ) : (
                        ''
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div>
              <strong style={{ color: 'red' }}>{this.state.error}</strong>
            </div>
          </CCardBody>
        </CCol>
      </CRow>
    )
  }
}
