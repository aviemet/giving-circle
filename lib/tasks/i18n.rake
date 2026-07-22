namespace :i18n do
  desc "Export i18n translations"
  task export: :environment do
    locales_path = Rails.root.join("app/frontend/lib/locales")

    # Remove all files in the locales directory
    FileUtils.rm_rf(Dir.glob("#{locales_path}/*"))

    system("bundle exec i18n export")
    system("node scripts/generate-locale-registry.mjs")
  end

  desc "Regenerate the frontend locale registry from exported JSON locales"
  task locale_registry: :environment do
    system("node scripts/generate-locale-registry.mjs")
  end
end
