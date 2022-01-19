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
      dataMap: new Map(),
      error: '',
    }
  }
  async componentDidMount() {
    await fetch('/getPartyRoutingProfileKeys')
      .then((res) => res.json())
      .then((data) => this.setState({ dataArray: JSON.parse(data.prpData), error: data.error }))

    this.state.dataArray.map((item, index) => this.getPartyRoutingProfileStatus(item))
  }
  getPartyRoutingProfileStatus(item) {
    const requestOptions = {
      method: 'GET',
      headers: { item: item },
    }
    fetch('/getPartyRoutingProfileStatus', requestOptions)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          dataMap: this.state.dataMap.set(item, JSON.parse(data.prpData)),
          error: data.error,
        }),
      )
  }
  async handleButtonClicked(item) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerOfferProcedureInstanceRecord: { customerReference: item } }),
    }
    await fetch('/UpdateCustomerOffer', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message)
      })

    this.getPartyRoutingProfileStatus(item)
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
                {this.state.dataArray.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item}</CTableDataCell>
                    <CTableDataCell>
                      {this.state.dataMap.get(item) == '1'
                        ? 'Complete'
                        : this.state.dataMap.get(item) == '0'
                        ? 'Processing'
                        : 'Unidentified'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {this.state.dataMap.get(item) == '0' ? (
                        <CButton
                          color="dark"
                          variant="outline"
                          type="submit"
                          className="px-5 py-0"
                          onClick={this.handleButtonClicked.bind(this, item)}
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
              <h6>{this.state.dataArray.length ? '' : '* No records available *'}</h6>
            </div>
            <div>
              <strong style={{ color: 'red' }}>{this.state.error}</strong>
            </div>
          </CCardBody>
        </CCol>
      </CRow>
    )
  }
}
