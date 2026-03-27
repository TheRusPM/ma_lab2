pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Start network') {
            steps {
                sh 'docker network inspect lab2-net >/dev/null 2>&1 || docker network create lab2-net'
            }
        }

        stage('Deploy') {
            steps {
                dir('service1') {
                    sh 'docker compose -f docker-compose.yaml up -d --build'
                }
                dir('service2') {
                    sh 'docker compose -f docker-compose.yaml up -d --build'
                }
                dir('nginx') {
                    sh 'docker compose -f docker-compose.yaml up  -d'
                }
            }
        }
    }

    post {
        always {
            script {
                try {
                    sh 'docker image prune -f'
                } catch (Exception e) {
                    echo "Не удалось выполнить docker prune: ${e.message}"
                }
            }
        }
        success {
            echo 'Pipeline завершен успешно'
            script {
                try {
                    sh 'docker ps'
                } catch (Exception e) {
                    echo "Не удалось выполнить docker ps: ${e.message}"
                }
            }
        }
        failure {
            echo 'Pipeline завершен с ошибкой'
            script {
                try {
                    sh 'docker ps'
                } catch (Exception e) {
                    echo "Не удалось выполнить docker ps: ${e.message}"
                }
            }
        }
    }
}