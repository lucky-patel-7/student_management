pipeline {
  agent any
  tools {
    nodejs '19.8.1'
  }
  stages {
    stage('Build Server') {
      steps {
        sh 'cd server && npm install'
      }
      post {
        success {
          emailext attachLog: true, body: '''Hello there! Here is your Server build results attached.''', subject: 'Build server success', to: 'lucky.patel@silvertouch.com'
        }
        failure {
          emailext attachLog: true, body: '''Hello there! Here is your Server build results attached.''', subject: 'Build server failed', to: 'lucky.patel@silvertouch.com'
        }
      }
    }

    stage('Test Server') {
      steps {
        sh 'cd server && npm test'
      }
      post {
        success {
          emailext attachLog: true, body: '''Hello there! Here is your Server Test results attached.''', subject: ' Server Test Success', to: 'lucky.patel@silvertouch.com'
        }
        failure {
          emailext attachLog: true, body: '''Hello there! Here is your Server Test results attached.''', subject: 'Server Test Failed', to: 'lucky.patel@silvertouch.com'
        }
      }
    }

    stage('Build Client') {
      steps {
        sh 'cd client && npm install'
      }
      post {
        success {
          emailext attachLog: true, body: '''Hello there! Here is your Client Build results attached.''', subject: ' Client Build Success', to: 'lucky.patel@silvertouch.com'
        }
        failure {
          emailext attachLog: true, body: '''Hello there! Here is your Client Build results attached.''', subject: 'Client Build Failed', to: 'lucky.patel@silvertouch.com'
        }
      }
    }

   stage('Test client') {
  steps {
    sh 'cd client && npm test'
    input message: 'Finished using the web site? (Click "Proceed" to continue)', submitter: 'user', inputTimeout: '3'

        
  }
  post {
    success {
      emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: ' Client Test Success', to: 'lucky.patel@silvertouch.com'
    }
    failure {
      emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: 'Client Test Failed', to: 'lucky.patel@silvertouch.com'
    }
    always {
      timeout(time: 1, unit: 'HOURS') {
        // Abort the pipeline after the Test client stage completes and the user clicks "Proceed"
        // This ensures that the pipeline does not wait indefinitely for user input
        error 'Pipeline aborted by timeout'
      }
    }
  }
}

    
    
    
//     stage('Making Client Build') {
//       steps {
//         sh 'cd client && npm build'
//       }
//       post {
//         success {
//           emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: ' Build Is Successfull', to: 'lucky.patel@silvertouch.com'
//         }
//         failure {
//           emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: 'Build Is Failed', to: 'lucky.patel@silvertouch.com'
//         }
//       }
//     }

  }  
}
