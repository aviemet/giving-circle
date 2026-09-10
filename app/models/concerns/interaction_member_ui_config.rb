module InteractionMemberUiConfig
  extend ActiveSupport::Concern

  included do
    before_validation :compile_config_from_member_ui
  end

  private

  def compile_config_from_member_ui
    ui = self[:member_ui]
    return unless ui.is_a?(Hash) && ui.present?

    self.config = Interactions::MemberUiCompiler.compile(
      ui,
      existing_config: config,
    )
  end
end
