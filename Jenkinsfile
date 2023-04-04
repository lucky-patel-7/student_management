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
}
