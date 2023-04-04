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
    failure {
      emailext body: "The build failed. Please check the console output.",
               subject: "Build failed: ${currentBuild.fullDisplayName}",
               to: "lbp7198@example.com"
    }
  }
}
