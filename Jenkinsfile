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
      mail to: "lbp7198@gmail.com",
           subject: "Build failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
           body: "The build failed. Please check the console output.\n\n${env.BUILD_URL}"
    }
  }
}
