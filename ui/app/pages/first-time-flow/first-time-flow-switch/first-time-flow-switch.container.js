import { connect } from 'react-redux'
import FirstTimeFlowSwitch from './first-time-flow-switch.component'

const mapStateToProps = ({ metamask }) => {
  const {
    completedOnboarding,
    isInitialized,
    isUnlocked,
    firstTimeFlowType,
    participateInMetaMetrics,
  } = metamask

  return {
    completedOnboarding,
    isInitialized,
    isUnlocked,
    firstTimeFlowType,
    participateInMetaMetrics,
  }
}

export default connect(mapStateToProps)(FirstTimeFlowSwitch)
