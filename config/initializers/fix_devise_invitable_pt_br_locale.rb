# frozen_string_literal: true

Rails.application.config.after_initialize do
  spec = Gem.loaded_specs["devise_invitable"]
  next unless spec

  locale_path = File.expand_path("config/locales/pt-BR.yml", spec.full_gem_path)
  next unless File.file?(locale_path)

  require "yaml"
  locale = YAML.safe_load_file(locale_path, aliases: true)
  next unless locale.is_a?(Hash)
  next unless locale.key?("pt_BR")
  next if locale.key?("pt-BR")

  I18n.load_path.reject! { |path| File.expand_path(path.to_s) == locale_path }

  corrected_dir = Rails.root.join("tmp/i18n")
  FileUtils.mkdir_p(corrected_dir)
  corrected_path = corrected_dir.join("devise_invitable.pt-BR.yml")
  File.write(corrected_path, YAML.dump({ "pt-BR" => locale["pt_BR"] }))

  corrected_expanded = corrected_path.to_s
  unless I18n.load_path.any? { |path| File.expand_path(path.to_s) == corrected_expanded }
    I18n.load_path << corrected_expanded
  end

  I18n.reload!
end
