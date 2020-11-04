import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
  DEFAULT_ROUTE,
  INITIALIZE_CREATE_PASSWORD_ROUTE,
  INITIALIZE_END_OF_FLOW_ROUTE,
  INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE,
  INITIALIZE_METAMETRICS_OPT_IN_ROUTE,
  INITIALIZE_SEED_PHRASE_ROUTE,
  INITIALIZE_UNLOCK_ROUTE,
  INITIALIZE_WELCOME_ROUTE,
} from '../../../helpers/constants/routes'
import { setSeedPhraseBackedUp } from '../../../store/actions'

export default class FirstTimeFlowSwitch extends PureComponent {
  static propTypes = {
    completedOnboarding: PropTypes.bool,
    isInitialized: PropTypes.bool,
    isUnlocked: PropTypes.bool,
    firstTimeFlowType: PropTypes.string,
    participateInMetaMetrics: PropTypes.bool,
  }

  render() {
    const {
      completedOnboarding,
      isInitialized,
      isUnlocked,
      firstTimeFlowType,
      participateInMetaMetrics,
    } = this.props

    if (completedOnboarding) {
      return <Redirect to={{ pathname: DEFAULT_ROUTE }} />
    }

    if (isInitialized) {
      if (!isUnlocked) {
        return <Redirect to={{ pathname: INITIALIZE_UNLOCK_ROUTE }} />
      } else if (firstTimeFlowType === 'create') {
        if (setSeedPhraseBackedUp) {
          return <Redirect to={{ pathname: INITIALIZE_END_OF_FLOW_ROUTE }} />
        }
        return <Redirect to={{ pathname: INITIALIZE_SEED_PHRASE_ROUTE }} />
      } else if (firstTimeFlowType === 'import') {
        return <Redirect to={{ pathname: INITIALIZE_END_OF_FLOW_ROUTE }} />
      }

      throw new Error(`Unrecognized first time flow type: ${firstTimeFlowType}`)
    }

    if (firstTimeFlowType) {
      if (participateInMetaMetrics === null) {
        return (
          <Redirect to={{ pathname: INITIALIZE_METAMETRICS_OPT_IN_ROUTE }} />
        )
      } else if (firstTimeFlowType === 'create') {
        return <Redirect to={{ pathname: INITIALIZE_CREATE_PASSWORD_ROUTE }} />
      } else if (firstTimeFlowType === 'import') {
        return (
          <Redirect
            to={{ pathname: INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE }}
          />
        )
      }

      throw new Error(`Unrecognized first time flow type: ${firstTimeFlowType}`)
    }

    return <Redirect to={{ pathname: INITIALIZE_WELCOME_ROUTE }} />
  }
}
