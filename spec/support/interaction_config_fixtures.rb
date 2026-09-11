module InteractionConfigFixtures
  ALLOCATION_ROUND = Interactions::MemberUiCompiler.compile(
    Interactions::MemberUiPresets::ALLOCATION,
  ).deep_stringify_keys.freeze

  FINALIST_VOTE = Interactions::MemberUiCompiler.compile(
    Interactions::MemberUiPresets::FINALIST_VOTE,
  ).deep_stringify_keys.freeze

  PLEDGES = Interactions::MemberUiCompiler.compile(
    Interactions::MemberUiPresets::PLEDGES,
  ).deep_stringify_keys.freeze
end
