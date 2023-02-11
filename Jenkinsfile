def image = ''

pipeline {
  agent any

  stages {
    stage('Prepare') {
      steps{
        git 'https://github.com/hvnhi/demo-seminar.git'
        script {
          def AUTHOR = ""
          def COMMIT_MSG = ""
          def BRANCH_NAME = "master"
          def APP_NAME = "Develop"
          def changeFolders = []
          def changeLogSets = currentBuild.changeSets
          for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
              def entry = entries[j]
              echo "${entry.commitId} by ${entry.author} on ${new Date(entry.timestamp)}: ${entry.msg}"
              
              AUTHOR = entry.author
              COMMIT_MSG += " %0A - ${entry.msg} "
            }
          }
          env.APP_NAME = APP_NAME
          env.BRANCH_NAME = BRANCH_NAME
          env.AUTHOR = AUTHOR
          env.COMMIT_MSG = COMMIT_MSG
          env.IMAGE_NAME = "hvnhi/nodeapp:v04"
        }
      }
    }

    stage('Build') {
      steps {
        script {
          image = docker.build("${env.IMAGE_NAME}", "-f Dockerfile .")
        }
      }
    }

    stage('Push') {
      steps {
        script {
          // This step should not normally be used in your script. Consult the inline help for details.
          withDockerRegistry(credentialsId: 'docker-hub-token', url: 'https://index.docker.io/v1/') {
              image.push()
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
            // kubernetesDeploy(configs: 'deployment.dev.yml', kubeConfig: [path: ''], kubeconfigId: 'k8s-config')
            withKubeConfig([credentialsId: 'k8s-config', serverUrl: 'http://192.168.4.49.2' ]) {
              sh "kubectl apply -f deployment.dev.yaml"
              sh """kubectl patch deployment hvnhi-nodeapp -p '{ \"spec\":{\"template\":{\"metadata\":{\"labels\":{\"buildNumber\":\"$BUILD_NUMBER\"}}}}}' """
            }
        }
      }
    }
  }
    
  post {
    // always {
    //   cleanWs()
    // }

    success {
      sh """
        curl -s 'https://api.telegram.org/bot5507538493:AAGzGrLpWOdRGf4or45pQ_IyejjxbSd9qvk/sendMessage?chat_id=-706657691&parse_mode=markdown&text=*SUCCESS* %0A %0A *${env.APP_NAME}* %0A %0A Branch: ${env.BRANCH_NAME} %0A %0A Author: ${env.AUTHOR} %0A %0A Message: ${env.COMMIT_MSG}' > /dev/null
      """
    }

    failure {
      sh """
        curl -s 'https://api.telegram.org/bot5507538493:AAGzGrLpWOdRGf4or45pQ_IyejjxbSd9qvk/sendMessage?chat_id=-706657691&parse_mode=markdown&text=*FAILED* %0A %0A *${env.APP_NAME}* %0A %0A Branch: ${env.BRANCH_NAME} %0A %0A Author: ${env.AUTHOR}' > /dev/null
      """
    }
  }
}