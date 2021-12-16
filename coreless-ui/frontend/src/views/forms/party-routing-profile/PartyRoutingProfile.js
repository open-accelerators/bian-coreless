import React from 'react'
import {
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
                  <CTableHeaderCell>Request</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Object.entries(this.state.dataArray).map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item[1].processId}</CTableDataCell>
                    <CTableDataCell>{item[1].customerOfferStatus}</CTableDataCell>
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
