pipeline {
  agent any
   triggers {
    githubPush(branch: "null")
  }
  tools {
    nodejs '19.8.1'
  }
  stages {
    stage('Build server') {
  steps {
    sh 'cd server && npm install'
  }
  post {
    success {
      emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Build server success', to: 'lucky.patel@silvertouch.com'
    }
    failure {
      emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Build server failed', to: 'lucky.patel@silvertouch.com'
    }
  }
}

    stage('Test server') {
  steps {
    sh 'cd server && npm test'
  }
  post {
    success {
      emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Build test success', to: 'lucky.patel@silvertouch.com'
    }
    failure {
      emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Build test failed', to: 'lucky.patel@silvertouch.com'
    }
  }
}

    stage('Build client') {
      steps {
        sh 'cd client && npm install'
      }
    }
    stage('Test client') {
      steps {
        sh 'cd client && npm test'
      }
    }
  }
  post {
    success {
    emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Success Build Results', to: 'lucky.patel@silvertouch.com'
    }
    failure {
    emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Failure Build Results', to: 'lucky.patel@silvertouch.com'
    }
    }
  }
