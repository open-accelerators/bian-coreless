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
import { object } from 'prop-types'
export default class CustomerOfferReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataMap: new Map(),
      dataArray: [],
      error: '',
    }
  }
  async componentDidMount() {
    fetch('/getCustomerOffers')
      .then((res) => res.json())
      .then((data) => this.parseData(JSON.parse(data.coData), data.error))
  }
  parseData(data, error) {
    data.map((item, index) => {
      this.setState({ dataMap: this.state.dataMap.set(item.id, item) })
    })
    this.setState({ dataArray: data, error: error })
  }
  async handleButtonClicked(item) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', id: item.id },
      body: JSON.stringify({
        CustomerOfferProcedure: { CustomerReference: item.customerReference },
      }),
    }
    fetch('/UpdateCustomerOffer', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        item.status = JSON.parse(data.coData).CustomerOfferProcessingTaskResult
        this.setState({
          dataMap: this.state.dataMap.set(item.id, item),
          error: data.error,
        })
      })
  }
  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <CCardHeader>
            <strong>Customer Offer Report</strong>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell width={325}>Id</CTableHeaderCell>
                  <CTableHeaderCell width={375}>Request</CTableHeaderCell>
                  <CTableHeaderCell width={375}>Status</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.dataArray.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{this.state.dataMap.get(item.id).id}</CTableDataCell>
                    <CTableDataCell>
                      {this.state.dataMap.get(item.id).customerReference}
                    </CTableDataCell>
                    <CTableDataCell>{this.state.dataMap.get(item.id).status}</CTableDataCell>
                    <CTableDataCell>
                      {this.state.dataMap.get(item.id).status == 'INITIATED' ? (
                        <CButton
                          color="dark"
                          variant="outline"
                          type="submit"
                          className="px-5 py-0"
                          onClick={this.handleButtonClicked.bind(
                            this,
                            this.state.dataMap.get(item.id),
                          )}
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
