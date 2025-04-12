// pipeline {  
//     agent any  

//     environment {  
//         AZURE_CREDENTIALS_ID = 'azure-service-principal-react'  
//         RESOURCE_GROUP = 'rg-azure-060425'  
//         APP_SERVICE_NAME = 'as-react-060425'  // Change this to your desired app service name  
//         AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'  
//         SYSTEM_PATH = 'C:\\Windows\\System32'  
//         TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'  
//         REACT_APP_DIR = 'react-jekins/build'  // Define your React app directory here  
//     }  

//     stages {  
//         stage('Test PowerShell Availability') {  
//             steps {  
//                 powershell 'Write-Host "Testing PowerShell availability"'  
//             }  
//         }  

//         stage('Terraform Init') {  
//             steps {  
//                 dir('terraform') {  
//                     // Use PowerShell to run Terraform  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     powershell """  
//                         Start-Sleep -Seconds 2  
//                         Write-Host "Terraform Init in progress..."  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Terraform Plan & Apply') {  
//             steps {  
//                 dir('terraform') {  
//                     // Use PowerShell to run Terraform Plan and Apply  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     powershell """  
//                         Start-Sleep -Seconds 5  
//                         Write-Host "Terraform Plan..."  
//                     """  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     // terraform apply -auto-approve  
//                     powershell """  
//                         Start-Sleep -Seconds 10  
//                         Write-Host "Terraform Apply..."  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Build React Application') {  
//             steps {  
//                 dir('react-jekins') {  
//                     // Use PowerShell for npm commands  
//                     powershell """  
//                         Start-Sleep -Seconds 12  
//                         Write-Host "Building React Application..."  
//                         npm install  
//                         npm run build  
//                         Compress-Archive -Path "build\\*" -DestinationPath "ReactApp.zip" -Force  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Deploy to Azure App Service') {  
//             steps {  
//                 withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {  
//                     // Use PowerShell to deploy to Azure  
//                     // $env:PATH = '$AZURE_CLI_PATH;$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     // az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path $WORKSPACE\\$REACT_APP_DIR\\ReactApp.zip --type zip  
//                     powershell """  
//                         Start-Sleep -Seconds 2  
//                         Write-Host "Deploying to Azure App Service..."  
//                     """  
//                 }  
//             }  
//         }  
//     }  

//     post {  
//         success {  
//             echo 'Deployment Successful!'  
//         }  
//         failure {  
//             echo 'Deployment Failed!'  
//         }  
//     }  
// }  

// NEW
pipeline {  
    agent any  

    environment {  
        AZURE_CREDENTIALS_ID = 'jenkins-sp'  
        RESOURCE_GROUP = 'rg-react'  
        APP_SERVICE_NAME = 'reactwebappjenkins838796'  
    }  

    stages {  
        stage('Checkout Code') {  
            steps {  
                echo 'Simulating code checkout...'  
                bat 'timeout /t 20 >nul' // 20 sec  
            }  
        }  

        stage('Terraform Init') {  
            steps {  
                echo 'Initializing Terraform...'  
                bat 'timeout /t 40 >nul' // 40 sec  
            }  
        }  

        stage('Terraform Import') {  
            steps {  
                echo 'Importing existing Azure resources...'  
                bat 'timeout /t 50 >nul' // 50 sec  
            }  
        }  

        stage('Terraform Plan & Apply') {  
            steps {  
                echo 'Planning and applying Terraform changes...'  
                bat 'timeout /t 80 >nul' // 80 sec  
            }  
        }  

        stage('Install Dependencies & Build React') {  
            steps {  
                echo 'Installing React dependencies and building...'  
                bat 'timeout /t 70 >nul' // 70 sec  
            }  
        }  

        stage('Check Build Folder') {  
            steps {  
                echo 'Checking for build output folder...'  
                bat 'timeout /t 40 >nul' // 40 sec  
            }  
        }  

        stage('Deploy to Azure using az webapp deploy') {  
            steps {  
                echo 'Simulating deployment to Azure App Service...'  
                bat 'timeout /t 90 >nul' // 90 sec  
            }  
        }  
    }  

    post {  
        success {  
            echo '✅ Fake React App Deployed Successfully!'  
        }  
        failure {  
            echo '❌ Something went wrong (but this should never fail 😉).'  
        }  
        always {  
            cleanWs()  
        }  
    }  
}  
