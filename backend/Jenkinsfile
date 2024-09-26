pipeline {
     
     agent any
     environment {
        HOME = "${env.WORKSPACE}"
        //DOCKERHUB_CREDS = 'docker-creds'
        //DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME') // Jenkins credential ID for DockerHub username
        //DOCKERHUB_PASSWORD = credentials('DOCKERHUB_PASSWORD') // Jenkins credential ID for DockerHub password
        DOCKER_IMAGE_NAME = 'vikasdfghjl/todo_app'
    }
       
      tools{
        //dockerTool 'Docker'
        nodejs 'Node-18.16.1' 
     }        
        stages {
            stage("build"){
                steps{
                    echo 'Executing npm...'
                    sh 'npm install'                                       
                    
                }
            }
        

            stage("test"){
                steps{
                    echo 'testing the application...'                    
                }
            }

            

            stage("docker build and Push"){
                steps{
                script{
                    // this will automatically login into docker
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDS', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        
                        sh 'echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'

                        def app = docker.build("vikasdfghjl/todo_app")
                        //sh "docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} ."

                        
                        app.push("${BUILD_NUMBER}")
                        //sh "docker push ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"

                        

                        //sh "docker run -d -p 4000:4000 --name todo_app ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
                        
                    }
                }
              }
            }

            stage("deploy"){
                steps{
                    sh "exit"
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDS', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        
                        

                        sh 'echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'
                        //docker stop todo_app
                        //docker rm todo_app
                        //docker pull vikasdfghjl/todo_app:latest
                        sh "docker run -d -p 4000:4000 ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"


                        
                    }
                    
                }
            }
            
        }     
}