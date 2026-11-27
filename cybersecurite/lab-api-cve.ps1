# Enrichissement d'un identifiant CVE PUBLIC, pas de données du SI.
# Requête HTTPS unique vers NVD ; connexion Internet nécessaire.
param([string]$CveId = 'CVE-2021-44228')
if ($CveId -notmatch '^CVE-[0-9]{4}-[0-9]{4,}$') { throw 'Identifiant CVE invalide' }
$uri = 'https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=' + $CveId
try {
    $data = Invoke-RestMethod -Uri $uri -Method Get -TimeoutSec 30
    if ($data.totalResults -ne 1) { throw 'Fiche indisponible ou ambiguë' }
    $v = $data.vulnerabilities[0].cve
    [pscustomobject]@{
      id=$v.id
      status=$v.vulnStatus
      published=$v.published
      modified=$v.lastModified
      retrievedUtc=(Get-Date).ToUniversalTime().ToString('o')
      references=@($v.references | ForEach-Object {$_.url})
    } | ConvertTo-Json -Depth 5
} catch { Write-Error ('NVD non disponible ou résultat non validé : ' + $_.Exception.Message) }
# Ce résultat ne démontre PAS qu'un actif est vulnérable.
