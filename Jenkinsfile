pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Use the NodeJS tool installer
    }

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-azure-060425'
        APP_SERVICE_NAME = 'as-react-060425'   // Change this to your desired app service name
        AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'
        SYSTEM_PATH = 'C:\\Windows\\System32'
        TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'
        REACT_APP_DIR = 'react-jekins/build'  // Define your React app directory here
    }

    stages {
        stage('Debug - Check cmd availability') {
            steps {
                // Directly call cmd.exe to check if it's available
                bat 'cmd.exe /c "echo Testing cmd availability"'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    // Call cmd.exe explicitly and run terraform init
                    bat 'cmd.exe /c "terraform init"'
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                dir('terraform') {
                    // Call cmd.exe explicitly for each terraform command
                    bat 'cmd.exe /c "terraform plan"'
                    bat 'cmd.exe /c "terraform apply -auto-approve"'
                }
            }
        }

        stage('Build React Application') {
            steps {
                dir('react-jekins') {
                    // Use cmd.exe to run npm commands
                    bat 'cmd.exe /c "npm install"'
                    bat 'cmd.exe /c "npm run build"'
                    bat 'cmd.exe /c "powershell Compress-Archive -Path build\\* -DestinationPath ReactApp.zip -Force"'
                }
            }
        }

        stage('Deploy to Azure App Service') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    // Use cmd.exe explicitly to deploy to Azure
                    bat 'cmd.exe /c "az webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src-path %WORKSPACE%\\%REACT_APP_DIR%\\ReactApp.zip --type zip"'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
