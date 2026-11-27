# Collecte de métadonnées agrégées. Laboratoire AD DS uniquement.
# Windows PowerShell avec RSAT. Aucun export de comptes, secrets, ACL brutes.
# Aucune modification du domaine. Les fichiers restent sensibles.
param([Parameter(Mandatory=$true)][string]$LabDomain,
      [Parameter(Mandatory=$true)][string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
Import-Module ActiveDirectory
$d = Get-ADDomain -Identity $LabDomain -Server $LabDomain
if ($d.DNSRoot -ne $LabDomain) { throw 'Domaine inattendu' }
$dir = New-Item -ItemType Directory -Path $OutputDirectory -Force
$forest = Get-ADForest -Server $LabDomain
$policy = Get-ADDefaultDomainPasswordPolicy -Server $LabDomain
$fg = @(Get-ADFineGrainedPasswordPolicy -Filter * -Server $LabDomain)
$computers = @(Get-ADComputer -Filter * -Server $LabDomain -Properties OperatingSystem)
$dc = @(Get-ADDomainController -Filter * -Server $LabDomain)
$summary = [ordered]@{
  collectedUtc = (Get-Date).ToUniversalTime().ToString('o')
  domainMode = [string]$d.DomainMode
  forestMode = [string]$forest.ForestMode
  forestDomainCount = @($forest.Domains).Count
  domainControllerCount = $dc.Count
  computerObjectCount = $computers.Count
  enabledComputerObjects = @($computers | Where-Object Enabled).Count
  fineGrainedPolicyCount = $fg.Count
  minimumPasswordLength = $policy.MinPasswordLength
  reversibleEncryptionEnabled = $policy.ReversibleEncryptionEnabled
  complexityEnabled = $policy.ComplexityEnabled
  lockoutThreshold = $policy.LockoutThreshold
  limitations = 'AD object counts only; no applied policy, patch or endpoint coverage evidence'
}
$file = Join-Path $dir.FullName 'ad-summary.json'
$summary | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 $file
Get-FileHash -Algorithm SHA256 $file | Select-Object Algorithm,Hash |
  ConvertTo-Json | Set-Content -Encoding UTF8 (Join-Path $dir.FullName 'ad-summary.sha256.json')
Write-Output 'Collecte terminée. Vérifier la confidentialité avant tout partage.'
