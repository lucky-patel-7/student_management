pipeline {
    agent any
    tools {
        nodejs '20.0.0'
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
            
            }
            post {
                success {
                    emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: ' Client Test Success', to: 'lucky.patel@silvertouch.com'
                }
                failure {
                    emailext attachLog: true, body: '''Hello there! Here is your Client Test results attached.''', subject: 'Client Test Failed', to: 'lucky.patel@silvertouch.com'
                }
            }
        }

        stage('Build and Publish Docker Image') {
            environment {
                DOCKER_HOST = 'tcp://192.168.0.162:2375'
                IMAGE_NAME = 'test'
                GIT_USERNAME = 'LuckyPatel'
                GIT_PASSWORD = 'Kq6jMBQaYjXzvnx'
            }
            steps {
                sh "docker -H $DOCKER_HOST build --build-arg GIT_USERNAME=$GIT_USERNAME --build-arg GIT_PASSWORD=$GIT_PASSWORD -f ./NodeDocker -t $IMAGE_NAME ."
                sh "docker -H $DOCKER_HOST run -d -p 80:80 $IMAGE_NAME"
            }
            post {
                success {
                    emailext attachLog: true, body: '''Hello there! Here is your Docker build results attached.''', subject: 'Docker Image Build Success', to: 'lucky.patel@silvertouch.com'
                }
                failure {
                    emailext attachLog: true, body: '''Hello there! Here is your Docker build results attached.''', subject: 'Docker Image Build Failed', to: 'lucky.patel@silvertouch.com'
                }
            }
        }

    }
}
