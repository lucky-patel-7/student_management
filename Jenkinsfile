pipeline {
  agent any
  tools {
    nodejs '19.8.1'
  }
  stages {
    stage('Build server') {
      steps {
        sh 'cd server && npm install'
      }
    }
    stage('Test server') {
      steps {
        sh 'cd server && npm test'
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
    emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Success Build Results', to: 'lbp7198@gmail.com'
    }
    failure {
    emailext attachLog: true, body: '''Hello there! Here is your build results attached.''', subject: 'Failure Build Results', to: 'lbp7198@gmail.com'
    }
    }
  }
}
