pipeline {
    agent {
        docker {
            image 'docker:dind'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Installing Node') {
            steps {
                sh 'apk add --no-cache nodejs npm'
                sh 'node --version'
                sh 'docker --version'
            }
        }

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
                IMAGE_NAME = 'test'
                GIT_USERNAME = 'LuckyPatel'
                GIT_PASSWORD = 'Kq6jMBQaYjXzvnx'
            }
            steps {
                sh "docker -H tcp://192.168.0.162:2375 build --build-arg GIT_USERNAME=$GIT_USERNAME --build-arg GIT_PASSWORD=$GIT_PASSWORD -f ./NodeDocker -t $IMAGE_NAME ."
                sh 'docker -H tcp://192.168.0.162:2375 run -d  --name ourApp1 -p 80:80 test'
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

        stage('Check Website') {
            steps {
                script {
                    sh 'sleep 30s'
                    def response = httpRequest url: 'http://192.168.0.162', httpMethod: 'HEAD'
                    if (response.status == 200) {
                        echo 'Website is running, You can check it here http://192.168.0.162'
                    } else {
                        error 'Website is not running'
                    }
                }
            }
            post {
                always {
                    script {
                        def emailSubject = 'Website Check Results'
                        def emailBody = 'Website check result: '
                        def response = httpRequest url: 'http://192.168.0.162', httpMethod: 'HEAD'
                        if (response.status == 200) {
                            emailBody += 'Website is running properly check here http://192.168.0.162'
            } else {
                            emailBody += 'Website is not running, please check the configurations'
                        }
                        emailext attachLog: true, body: emailBody, subject: emailSubject, to: 'lucky.patel@silvertouch.com'
                    }
                }
            }
        }
    }
}
