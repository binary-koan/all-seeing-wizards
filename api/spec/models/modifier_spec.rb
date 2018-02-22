require 'rails_helper'

RSpec.describe Modifier, type: :model do
  let(:modifier) { Modifier.new(modifier_type: modifier_type, player: player, amount: amount, duration_type: duration_type, duration: duration) }

  let(:modifier_type) { Modifier::MODIFIER_SHIELD }
  let(:player) { Player.new }
  let(:amount) { nil }
  let(:duration_type) { HasDuration::DURATION_ACTION }
  let(:duration) { 1 }

  describe "#priority" do
    let(:modifiers) do
      [
        Modifier.new(modifier_type: Modifier::MODIFIER_INCREASE_DAMAGE),
        Modifier.new(modifier_type: Modifier::MODIFIER_MIRROR_SHIELD),
        Modifier.new(modifier_type: Modifier::MODIFIER_PREVENT_ACTIONS),
        Modifier.new(modifier_type: Modifier::MODIFIER_SHIELD)
      ]
    end

    it "has the correct ordering" do
      expect(modifiers.sort_by(&:priority).map(&:modifier_type)).to eq [
        Modifier::MODIFIER_PREVENT_ACTIONS,
        Modifier::MODIFIER_SHIELD,
        Modifier::MODIFIER_MIRROR_SHIELD,
        Modifier::MODIFIER_INCREASE_DAMAGE
      ]
    end
  end

  describe "#replace_result_as_caster" do
    subject(:replacement_result) { modifier.replace_result_as_caster(effect_result) }

    context "an increase damage modifier" do
      let(:modifier_type) { Modifier::MODIFIER_INCREASE_DAMAGE }
      let(:amount) { 2 }
      let(:effect_result) { EffectResult::TakeDamage.new(caster: instance_double(Player), target: instance_double(Player), damage: 1) }

      it "increases the damage of an attack" do
        expect(replacement_result).to be_a(EffectResult::TakeDamage)
        expect(replacement_result.damage).to eq(3)
      end

      context "when the effect is not an attack" do
        let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

        it "does nothing" do
          expect(replacement_result).to eq(effect_result)
        end
      end
    end

    context "a prevent actions modifier" do
      let(:modifier_type) { Modifier::MODIFIER_PREVENT_ACTIONS }
      let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

      it "prevents any effect result" do
        expect(replacement_result).to be_a(EffectResult::None)
      end
    end

    context "a different modifier" do
      let(:modifier_type) { Modifier::MODIFIER_SHIELD }
      let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

      it "has no effect" do
        expect(replacement_result).to eq(effect_result)
      end
    end
  end

  describe "#replace_result_as_target" do
    subject(:replacement_result) { modifier.replace_result_as_target(effect_result) }

    context "a shield modifier" do
      let(:modifier_type) { Modifier::MODIFIER_SHIELD }
      let(:effect_result) { EffectResult::TakeDamage.new(caster: instance_double(Player), target: instance_double(Player), damage: 1) }

      it "removes attack damage" do
        expect(replacement_result).to be_a(EffectResult::ShieldDamage)
      end

      context "when the effect is not an attack" do
        let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

        it "does nothing" do
          expect(replacement_result).to eq(effect_result)
        end
      end
    end

    context "a mirror shield modifier" do
      let(:modifier_type) { Modifier::MODIFIER_MIRROR_SHIELD }
      let(:effect_result) { EffectResult::TakeDamage.new(caster: instance_double(Player), target: instance_double(Player), damage: 1) }

      it "replaces attack damage" do
        expect(replacement_result).to be_a(EffectResult::TakeDamage)
        expect(replacement_result).to have_attributes(caster: effect_result.target, target: effect_result.caster)
      end

      context "when the effect is knockback" do
        let(:effect_result) { EffectResult::Knockback.new(caster: instance_double(Player), target: instance_double(Player), target_position: nil) }

        it "prevents any effect result" do
          expect(replacement_result).to be_a(EffectResult::None)
        end
      end

      context "when the effect prevents actions" do
        let(:caster) { instance_double(Player) }
        let(:target) { instance_double(Player) }
        let(:effect_result) { EffectResult::PreventActions.new(caster: caster, target: target, duration_type: HasDuration::DURATION_ACTION, duration: 1) }

        it "reverses the effect" do
          expect(replacement_result).to be_a(EffectResult::PreventActions)
          expect(replacement_result).to have_attributes(caster: target, target: caster)
        end
      end

      context "when the effect is not an attack" do
        let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

        it "does nothing" do
          expect(replacement_result).to eq(effect_result)
        end
      end
    end

    context "a prevent actions modifier" do
      let(:modifier_type) { Modifier::MODIFIER_PREVENT_ACTIONS }
      let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

      it "prevents any effect result" do
        expect(replacement_result).to be_a(EffectResult::None)
      end
    end

    context "a different modifier" do
      let(:modifier_type) { Modifier::MODIFIER_INCREASE_DAMAGE }
      let(:effect_result) { EffectResult::Base.new(target: nil, caster: nil) }

      it "has no effect" do
        expect(replacement_result).to eq(effect_result)
      end
    end
  end
end
